import { Modifier, EditorState } from 'draft-js';
import { MentionData } from '..';
import getSearchText from '../utils/getSearchText';
import getTypeByTrigger from '../utils/getTypeByTrigger';

export default function addMention(
  editorState: EditorState,
  mention: MentionData,
  mentionPrefix: string,
  mentionTrigger: string,
  entityMutability: 'SEGMENTED' | 'IMMUTABLE' | 'MUTABLE'
): EditorState {
  const currentSelectionState = editorState.getSelection();
  const { begin, end } = getSearchText(editorState, currentSelectionState, [
    mentionTrigger,
  ]);

  // get selection of the @mention search text
  const mentionTextSelection = currentSelectionState.merge({
    anchorOffset: begin,
    focusOffset: end,
  });

  const firstMentionCharacter = mention.name.charAt(0);

  console.log('mentionTrigger', mentionTrigger)
  console.log('firstMentionCharacter', firstMentionCharacter)
  console.log('test', mentionTrigger === firstMentionCharacter ? mention.name : mentionPrefix + mention.name)

  let mentionReplacedContent = Modifier.replaceText(
    editorState.getCurrentContent(),
    mentionTextSelection,
    `${mentionTrigger === firstMentionCharacter ? mention.name : mentionPrefix + mention.name}`,
    editorState.getCurrentInlineStyle()
  );

  // If the mention is inserted at the end, a space is appended right after for
  // a smooth writing experience.
  const blockKey = mentionTextSelection.getAnchorKey();
  const blockSize = editorState
    .getCurrentContent()
    .getBlockForKey(blockKey)
    .getLength();
  if (blockSize === end) {
    mentionReplacedContent = Modifier.insertText(
      mentionReplacedContent,
      mentionReplacedContent.getSelectionAfter(),
      ' '
    );
  }

  const newEditorState = EditorState.push(
    editorState,
    mentionReplacedContent,
    'insert-fragment'
  );
  return EditorState.forceSelection(
    newEditorState,
    mentionReplacedContent.getSelectionAfter()
  );
}
