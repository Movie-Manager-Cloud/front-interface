import ApiErrorHandler from "../ApiErrorHandler";
import hash from 'object-hash';
class Api400Handler extends ApiErrorHandler {
  /*
  Api400Handler is used to handle the 400 error code
  This error code is used when the request is not valid, so with bad parameters
  */

  constructor(response, attributeName, errorMessage) {
    super(400,response);
    this.attributeName = attributeName;
    this.errorMessage = errorMessage;
  }

  equalsTo(errorToCompare) {
    /* 
    Ovveride
    This function is used as a surcharge of the object to compare two Api400Handler objects
    */
   console.log(errorToCompare)
    if (!errorToCompare.isBadRequest()) {
      return false;
    }
    if(hash(this.getErrorMessage()+ this.getAttributeName()) !== hash(errorToCompare.getErrorMessage() + errorToCompare.getAttributeName())) {

      return false;
    }
    return true;
  }


  getErrorMessage() {
    return this.errorMessage;
  }
  getAttributeName() {
    return this.attributeName;
  }

  hasErrorForAttribute(attributeName) {
    return this.attributeName === attributeName;
  }
}
export default Api400Handler;