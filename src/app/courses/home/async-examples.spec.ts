import { fakeAsync, flush, tick } from "@angular/core/testing";

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
    expect(test).toBeFalsy();
  });

  it("Asynchronous test example - setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {}); // adding a 2nd one changes error to 2 timer(s) still in the queue

    setTimeout(() => {
      console.log("running assertions setTimeout()");
      test = true;

      // can remove this test. we don't have to write the assertions in the nested code blocks when using fakeAsync and tick
      // expect(test).toBeTruthy();
    }, 1000);

    expect(test).toBeFalsy();

    // method 1: use tick to move time forward
    // tick(500); // move time forward 500ms
    // // still fails if we stop here
    // tick(499); // move time forward 499ms
    // // still fails if we stop here
    // tick(1); // move time forward 1ms

    // method 2: use flush to make sure all of the async operations timeouts have been executed before moving on.
    flush();

    expect(test).toBeTruthy();
  }));

  fit("Asynchronous test example - plain Promise", () => {
    let test = false;

    console.log("Creating promise");

    setTimeout(() => {
      console.log("setTimeout() first callback triggered");
    });

    setTimeout(() => {
      console.log("setTimeout() second callback triggered");
    });

    Promise.resolve().then(() => {
      console.log("Promise first then() evaluated successfully");

      return Promise.resolve();
    })
    .then(() => {
      console.log("Promise second then() evaluated successfully");

      test = true;
    });

    console.log("Running test assertions");

    expect(test).toBeTruthy();
  });
});
