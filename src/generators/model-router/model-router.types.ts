export interface RequestState {
  idle?: boolean;
  loading?: boolean;
  error?: string;
  success?: boolean;
}

export const IdleRequest: RequestState = {
  idle: true,
};

export const LoadingRequest: RequestState = {
  loading: true,
};

export const SuccessRequest: RequestState = {
  success: true,
};
