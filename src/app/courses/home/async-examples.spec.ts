fdescribe("Async Testing Examples", () => {
  // This approach should be avoided.  Hard to know how long to wait, and might exceed timeout. nested timeout blocks, etc
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("running assertions");
      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });
});
