const logoutWithSessions = async (req, res) => {
  const objectUser = req.user.toObject();
  const accessToken = req.accessToken;
  const userSessions = objectUser.userSessions;

  for (let i = 0; i < userSessions.length; i++) {
    if (accessToken === userSessions[i].accessToken) {
      userSessions.splice(i, 1);
      break;
    }
  }

  req.user.userSessions = userSessions;
  await req.user.save();

  res.status(204).json({});
};

module.exports = logoutWithSessions;
