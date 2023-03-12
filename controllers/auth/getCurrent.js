const getCurrent = async (req, res) => {
  const { email, name, avatarURL } = req.user;
  res.json({
    email,
    name,
    avatarURL,
  });
};

module.exports = getCurrent;
