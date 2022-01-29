const { User, Plane, Like } = require('../database/models');
// METHOD: POST
// ROUTE: /like
// DESC: like or unlike post
exports.postLike = async (req, res) => {
  const authenticatedUser = req.user;
  const { planeId } = req.body;
  try {
    // get user id
    const user = await User.findOne({
      where: { uuid: authenticatedUser.uuid },
    });
    if (!user) throw { status: 404, message: 'user not found' };

    // get plane id
    const plane = await Plane.findOne({
      where: { uuid: planeId },
      include: 'likedBy',
    });
    if (!plane) throw { status: 404, message: 'plane not found' };

    // check if user already liked the plane
    const like = await Like.findOne({
      where: {
        UserId: user.id,
        PlaneId: plane.id,
      },
    });

    if (like) {
      await Like.destroy({
        where: { uuid: like.uuid },
      });
    } else {
      await Like.create({
        UserId: user.id,
        PlaneId: plane.id,
      });
    }

    const userResponse = await User.findOne({
      where: { uuid: user.uuid },
      include: [
        {
          model: Plane,
          as: 'likedPlanes',
          through: { attributes: [] },
          include: 'owner',
        },
      ],
    });

    const planeResponse = await Plane.findOne({
      where: { uuid: plane.uuid },
      include: [
        {
          model: User,
          as: 'likedBy',
          attributes: ['uuid', 'username'],
          exclude: ['Like'],
        },
      ],
    });
    res.status(200).json({ user: userResponse, plane: planeResponse });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || 'some error acuired!',
    });
  }
};
