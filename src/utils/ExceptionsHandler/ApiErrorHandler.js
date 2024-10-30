class ApiErrorHandler {
  constructor(code,response) {
    this.code = code;
    this.response = response;
  }
  get_code() {
    return this.code;
  }

  isBadRequest() {
    return this.code === 400;
  }
  getResponse() {
    return this.response;
  }
  equalsTo(error) {
    // Raise Must be implemented
    throw new Error("Must be implemented");
  }
}

export default ApiErrorHandler;