import Api400Handler from "./ApiCodesHandler/Api400Handler";
class ApiErrorDispatcher {
  /*
  This class is used to handle different type of 
  code errors and return the object adapted that will be 
  used in the frontend
  */
  constructor(code_error,response) {
    this.code = code_error;
    return this.errorHandlerDispatcher(response);
  }
  handle(error) {
    console.log(error);
  }

  errorHandlerDispatcher(response) {
    switch (this.code) {
      case 400:
        let list = [];
        for (let index in response.data) {
          list.push(new Api400Handler(response, index, response.data[index][0]));
        }
        return list;
        
      case 401:
        return new Api401Handler();
      case 403:
        return new Api403Handler();
      case 404:
        return new Api404Handler();
      case 500:
        return new Api500Handler();
      default:
        return new ApiErrorHandler();
    }
  }

  get_code() {
    return this.code;
  }
}

export default ApiErrorDispatcher