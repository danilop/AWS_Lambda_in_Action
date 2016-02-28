exports.handler = function(event, context) {
  context.succeed(event.myip);
};
