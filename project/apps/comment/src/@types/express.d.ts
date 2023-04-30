// eslint-disable-next-line
namespace Express {
  // eslint-disable-next-line
  interface Request {
    user: {
      id: string;
      email: string;
      role: AvailableRole;
      lastname: string;
      firstname: string;
    };
  }
}
