// ***** React Import
import { useState, useEffect } from "react";

// MUI Import
import {
	Button,
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton,
	Card,
	Box,
	CardContent,
	Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Extra Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userProfileValidations } from "@/validation_schema/profileValidation";
import { ToastContainer } from "react-toastify";

// Types Import
import { userType } from "@/types/userType";

// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from "@/common/LayoutNavigations/footer";
import { capitalizeFirstLetter } from "@/common/CapitalFirstLetter/capitalizeFirstLetter";
import SpinnerProgress from "@/common/CircularProgressComponent/spinnerComponent";

// External css IMport
import profiles from "../../styles/profile.module.css";
import styles from "../../styles/sidebar.module.css";
import "react-toastify/dist/ReactToastify.css";

// API services
import { HandleProfile } from "@/services/user";
import { HandleUpdateProfile } from "@/services/user";
import { BASE_URL } from "@/config/config";

export default function Profile() {
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		getValues,
		formState: { errors },
	} = useForm<userType | any>({
		resolver: yupResolver(userProfileValidations),
	});
	const [previewProfile, setPreviewProfile] = useState('')
	const [file, setFile] = useState('')

	const [isLoading, setLoading] = useState(false);
	const [toggle, setToggle] = useState<boolean>(false);
	const getUserData = getValues()

	const onSubmit = async (event: any) => {
		const reqData = { ...event, 'profile_pic': file }
		const formData = new FormData()

		for (var key in reqData) {
			formData.append(key, reqData[key]);
		}

		await HandleUpdateProfile(reqData.id, formData)
			.then((res) => {
				setTimeout(() => {
					getProfileData(res.data.id);
					setToggle(!toggle);
				}, 3000);
			})
			.catch((err) => {
				console.log(err);
			});
	};


	function ErrorShowing(errorMessage: any) {
		return (
			<Typography variant="body2" color={"error"} gutterBottom>
				{errorMessage}{" "}
			</Typography>
		);
	}

	const getProfileData = (userId: any) => {
		setLoading(true);
		HandleProfile(userId).then((user) => {
			const fields = [
				"id",
				"first_name",
				"last_name",
				"email",
				"role_id",
				"profile_pic",
			];
			fields.forEach((field) => setValue(field, user.data[field]));
			setLoading(false);
		});
	};
	useEffect(() => {
		let localData: any;
		if (typeof window !== "undefined") {
			localData = window.localStorage.getItem("userData");
		}
		if (localData) {
			const userId = JSON.parse(localData);
			getProfileData(userId?.id);
		}
	}, []);


	const handleEdit = async () => {
		setToggle(!toggle);
	};

	const handleChange = (e: any) => {
		const file = e.target.files[0];
		if (e.target.name === "profile_pic") {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				setPreviewProfile(e.target.result);
				setFile(file)
			}
			reader.readAsDataURL(file);
		}
	}

	if (isLoading) return <SpinnerProgress />;
	if (!getUserData) return <p>No profile data</p>;

	return (
		<>
			<Navbar />
			<Box className={styles.combineContentAndSidebar}>
				<SideBar />

				<Box className={styles.siteBodyContainer}>
					{/* breadcumbs */}
					<BreadcrumbsHeading
						First="Home"
						Middle="Profile"
						Text="USER PROFILE"
						Link="/profile"
					/>

					{/* main content */}
					<Card>
						<CardContent>
							<Box
								component="form"
								method="POST"
								noValidate
								autoComplete="off"
								onSubmit={handleSubmit(onSubmit)}
							// onReset={reset}
							>
								<Grid container spacing={3}>
									<Grid item xs={12} sm={12} md={12} lg={12}>
										<Box className={profiles.profileImageBox}>
											<Box >
												{!toggle ? <Box
													component="img"
													src={getUserData.profile_pic ? `${BASE_URL}/${getUserData.profile_pic}` : "/profile.png"}
													width="150px"
													height="150px"
													borderRadius="15px" /> :
													<InputLabel>
														<Box>
															<Box
																component="img"
																src={previewProfile ? previewProfile : getUserData.profile_pic ? `${BASE_URL}/${getUserData.profile_pic}` : "/profile.png"}
																width="150px"
																height="150px"
																borderRadius="15px" />
															<IconButton className={profiles.cameraIcon} aria-label="upload picture" component="label"> <CameraAltIcon sx={{ fontSize: "medium" }} /> </IconButton>

															<input
																type="file"
																{...register("profile_pic")}
																onChange={handleChange}
																hidden

															/>
														</Box>
													</InputLabel>}
											</Box>
											<Box sx={{ marginLeft: "15px" }}>
												<Typography
													variant="subtitle1"
													sx={{ fontWeight: "bold", color: "#7C7C7C" }}
												>
													{getUserData
														? capitalizeFirstLetter(getUserData?.first_name)
														: ""}{" "}
													{getUserData?.last_name}
												</Typography>

												<Typography variant="subtitle2" sx={{ color: "#7C7C7C" }}>
													{getUserData?.email}
												</Typography>

												<Typography variant="subtitle2" sx={{ color: "#7C7C7C" }}>
													{getUserData?.role_id === 2 ? "Learner" : "Admi666666n"}
												</Typography>

												<IconButton onClick={handleEdit}>
													<EditIcon></EditIcon>
												</IconButton>
											</Box>
										</Box>
									</Grid>
								</Grid>


								<Grid
									container
									spacing={4}
									sx={{
										maxWidth: "50%",
										width: " 100%",
										float: "right",
										marginRight: "100px",
										marginBottom: "32px",
									}}
								>
									<Grid item xs={12} sm={12} md={6} lg={6}>
										<TextField
											fullWidth
											label="First Name"
											{...register("first_name")}
											defaultValue={getUserData?.first_name}
											disabled={!toggle}
										/>
										{errors && errors.first_name
											? ErrorShowing(errors?.first_name?.message)
											: ""}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<TextField
											fullWidth
											label="Last Name"
											{...register("last_name")}
											defaultValue={capitalizeFirstLetter(
												getUserData?.last_name
											)}
											disabled={!toggle}
										/>
										{errors && errors.last_name
											? ErrorShowing(errors?.last_name?.message)
											: ""}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<TextField
											fullWidth
											label="Email"
											{...register("email")}
											defaultValue={getUserData?.email}
											disabled={!toggle}
										/>
										{errors && errors.email
											? ErrorShowing(errors?.email?.message)
											: ""}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<FormControl fullWidth>
											<InputLabel>Role</InputLabel>
											<Select
												label="Role"
												{...register("role_id")}
												defaultValue={getUserData.role_id}
												disabled={!toggle}
											>
												<MenuItem value={1}>Admin</MenuItem>
												<MenuItem value={2}>Learner</MenuItem>
											</Select>
										</FormControl>
									</Grid>

									{toggle && (
										<Grid
											item
											xs={12}
											sm={12}
											md={12}
											lg={12}
											textAlign={"right"}
										>
											<Button type="submit" size="large" variant="contained">
												Update Profile
											</Button>
										</Grid>
									)}
								</Grid>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</Box>
			{/* <Footer /> */}
			<ToastContainer />
		</>
	);
}
