export class AgensResponseResult {
  query: AgensResponseResultQuery;
  meta: AgensResponseResultMeta[];
  rows: any[];
  size: number;
  message: string;
  finishTime: number;
};

export class AgensResponseResultQuery {
  sessionId: string;
  requestId: number;
  requestTime: number;
  sql: string;
};

export class AgensResponseResultMeta {
  label: string;
  type: string;
};