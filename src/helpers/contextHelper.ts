const assertUnreachable = (assert: never): never => {
  throw new Error(`Didn't expect to get here: ${assert}`);
};

export default assertUnreachable;
