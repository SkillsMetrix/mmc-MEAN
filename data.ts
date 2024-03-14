onst config = {
  name: 'appCounter',
  slidingWindowSize: 6, // Failure Rate Calculation is done on the last 6 iterations
  minimumNumberOfCalls: 3, // 3 iterations are needed to start calculating the failure rate, and see if circuit should be opened or not
  failureRateThreshold: 60, // If half of the iterations or more are failing, the circuit is switched to Opened state.
  slowCallDurationThreshold: 500, // An iteration is considered as being slow if the iteration lasts more than 1s
  slowCallRateThreshold: 50, // If at least 80% of the iterations are considered as being slow, the circuit is switched to Opened state.
  permittedNumberOfCallsInHalfOpenState: 2, // When the circuit is in Half Opened state, the circuit accepts 2 iterations in this state.
  openStateDelay: 10000, // The circuit stays in Opened state for 10s
  halfOpenStateMaxDelay: 30000,
}
