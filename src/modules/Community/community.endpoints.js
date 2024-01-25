const roles = {
  Admin: "Admin",
  User: "User",
  SuperAdmin: "SuperAdmin",
};

export const endPoint = {
  createCommunity: [roles.SuperAdmin],
  deleteCommunity: [roles.SuperAdmin],
  getCommunities: [roles.SuperAdmin, roles.User],
  addProperty: [roles.SuperAdmin],
  viewProperty: [roles.Admin, roles.SuperAdmin , roles.User],
  deleteProperty: [roles.SuperAdmin],
  updateCommunity: [roles.SuperAdmin],
};
