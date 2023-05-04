export const getRabbitMqConnectionString = ({ user, password, host, port }) => {
  return `amqp://${user}:${password}@${host}:${port}`;
};
