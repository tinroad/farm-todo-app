import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Public = (props) => {
	const { children } = props;
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [isVerified, setIsVerified] = useState(false);

	useEffect(() => {
		if (auth.isAuthenticated) {
			navigate("/", {
				replace: true,
				state: {
					from: location,
				},
			});
		} else {
			setIsVerified(true);
		}
	}, [auth.isAuthenticated, navigate, location]);

	if (!isVerified) return null;
	return <>{children}</>;
};
