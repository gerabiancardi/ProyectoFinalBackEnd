export function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.length === 1 && policies[0] === "PUBLIC") {
      return next();
    }
    if (!req.session.user) {
      return res
        .status(401)
        .send({ message: "Acceso denegado. Token inválido o expirado."});
    }
    if (policies.includes(req.session.user._doc.role)) {
      return next();
    } else {
      return res
        .status(403)
        .send({ message: "Acceso denegado. Rol no autorizado." });
    }
  };
}

