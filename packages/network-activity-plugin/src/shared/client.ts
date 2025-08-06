import { RozeniteDevToolsClient } from '@rozenite/plugin-bridge';

export type HttpHeaders = Record<string, string>;

export type RequestId = string;
export type Timestamp = number;

export type XHRPostData = 
  | string
  | Blob
  | FormData
  | ArrayBuffer
  | ArrayBufferView
  | unknown
  | null 
  | undefined;

export type RequestPostData = 
  | { type: 'text', value: string }
  | { type: 'form-data', value: Record<string, unknown> }
  | { 
      type: 'binary', 
      value: { size: number; type?: string; name?: string; } 
    };

export type Request = {
  url: string;
  method: string;
  headers: HttpHeaders;
  postData?: RequestPostData;
};

export type Response = {
  url: string;
  status: number;
  statusText: string;
  headers: HttpHeaders;
  contentType: string;
  size: number;
  responseTime: Timestamp;
};

export type Initiator = {
  type: string;
  url?: string;
  lineNumber?: number;
  columnNumber?: number;
};

export type ResourceType = 'XHR' | 'Fetch' | 'Other';

export type NetworkActivityEventMap = {
  // Control events
  'network-enable': unknown;
  'network-disable': unknown;

  // Network request events
  'request-sent': {
    requestId: RequestId;
    request: Request;
    timestamp: Timestamp;
    initiator: Initiator;
    type: ResourceType;
  };

  'response-received': {
    requestId: RequestId;
    timestamp: Timestamp;
    type: ResourceType;
    response: Response;
  };

  'request-completed': {
    requestId: RequestId;
    timestamp: Timestamp;
    duration: number;
    size: number;
    ttfb: number;
  };

  'request-failed': {
    requestId: RequestId;
    timestamp: Timestamp;
    type: ResourceType;
    error: string;
    canceled: boolean;
  };

  'get-response-body': {
    requestId: RequestId;
  };

  'response-body': {
    requestId: RequestId;
    body: string | null;
  };
};

export type NetworkActivityDevToolsClient =
  RozeniteDevToolsClient<NetworkActivityEventMap>;
