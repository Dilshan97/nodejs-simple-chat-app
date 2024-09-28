/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
const buildSocketResponse = (
  success: Boolean,
  message: string | null,
  payload: any
) => {
  return { status: success ? "OK" : "NOK", message, payload };
};

export default buildSocketResponse;
