/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
class CustomAPIError extends Error {
  data: {};
  constructor(message: string, data?: {}) {
    super(message);
    if (data) {
      this.data = data;
    } else {
      this.data = {};
    }
  }
}

export default CustomAPIError;
