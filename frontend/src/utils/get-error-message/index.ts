export const getErrorMessage = (error: any): string => {
  const errorExtractedFromDetails = error?.details?.split(' ')?.pop();
  return errorExtractedFromDetails || error?.shortMessage;
};
