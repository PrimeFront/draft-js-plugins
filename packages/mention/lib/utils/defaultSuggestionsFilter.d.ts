import { MentionData, MultiMentionData } from '..';
declare const defaultSuggestionsFilter: (searchValue: string, suggestions: MultiMentionData | MentionData[], trigger?: string) => MentionData[];
export default defaultSuggestionsFilter;
