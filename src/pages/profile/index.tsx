// ***** React Import 
import { useState, useEffect } from 'react'

// MUI Import
import {
	Button,
	TextField,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	IconButton, Card, Box, CardContent, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BackupIcon from "@mui/icons-material/Backup";

// Extra Import
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userRegisterValidations } from "../../validation_schema/authValidation";

// Types Import
import { registerType } from "../../types/authType";
import { userType } from '@/types/userType';

// External Components
import Navbar from "@/common/LayoutNavigations/navbar";
import SideBar from "@/common/LayoutNavigations/sideBar";
import BreadcrumbsHeading from "@/common/BreadCrumbs/breadcrumbs";
import Footer from '@/common/LayoutNavigations/footer';
import { capitalizeFirstLetter } from '@/common/CapitalFirstLetter/capitalizeFirstLetter';
import SpinnerProgress from '@/common/CircularProgressComponent/spinnerComponent';

// External css IMport
import profiles from "../../styles/profile.module.css";
import styles from "../../styles/sidebar.module.css";

// API services
import { HandleProfile } from '@/services/user';


export default function Profile() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<registerType>({ resolver: yupResolver(userRegisterValidations) });

	const [toggle, setToggle] = useState<boolean>(false);
	const [user, setData] = useState<userType | null>(null)
	const [role, setRole] = useState<userType | number>(0)
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		let localData: any;
		if (typeof window !== "undefined") {
			localData = window.localStorage.getItem('userData')
		}
		if (localData) {
			const userId = JSON.parse(localData)
			setLoading(true)
			HandleProfile(userId?.id)
				.then((user) => {
					setData(user.data)
					setRole(user.data.role_id)
					setLoading(false)
				})
		}

	}, [])
	
	if (isLoading) return <SpinnerProgress/>
	if (!user) return <p>No profile data</p>

	const handleEdit = async () => {
		setToggle(true)
	}

	const handleChange = () => {

	}

	return (
		<>
			<Navbar />
			<Box className={styles.combineContentAndSidebar}>
				<SideBar />

				<Box padding={2} width={'100%'}>

					{/* breadcumbs */}
					<BreadcrumbsHeading
						First="Home"
						Middle="Profile"
						Text="USER PROFILE"
						Link="/profile"
					/>

					{/* main content */}
					<Card >
						<CardContent >
							<Grid container spacing={3} >
								<Grid item xs={12} sm={12} md={12} lg={12}>
									<Box className={profiles.profileImageBox} >
										<Box component='img' src="/profile.png" width='150px' height='150px' borderRadius='15px' />
										<Box sx={{ marginLeft: '15px' }}>
											<Typography
												variant="subtitle1"
												sx={{ fontWeight: "bold", color: "#7C7C7C" }}>
												{user ? capitalizeFirstLetter(user?.first_name) : ''} {user?.last_name}
											</Typography>

											<Typography
												variant="subtitle2"
												sx={{ color: "#7C7C7C" }}>
												{user?.email}
											</Typography>

											<Typography
												variant="subtitle2"
												sx={{ color: "#7C7C7C" }}>
												Learner
											</Typography>

											<IconButton onClick={handleEdit}>
												<EditIcon>
												</EditIcon>
											</IconButton>

										</Box>
									</Box>
								</Grid>
							</Grid>

							<Grid container spacing={3} columns={{ xs: 8, sm: 8, md: 12, lg: 12 }} sx={{ maxWidth: '50%', width: ' 100%', float: 'right', marginRight: '100px', marginBottom: '150px' }}>

								<Grid item xs={12} sm={12} md={6} lg={6}>

									<TextField
										id="outlined-read-only-input"
										label="First Name"
										value={user ? capitalizeFirstLetter(user?.first_name) : ' '}
										InputProps={{
											readOnly: !toggle,
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6} lg={6}>
									<TextField

										InputProps={{
											readOnly: !toggle,
										}}
										label="First Name"
										id="outlined-fname"
										value={user ? capitalizeFirstLetter(user?.last_name) : ' '}

									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6} lg={6}>
									<TextField
										id="outlined-read-email-input"
										label="Email"
										value={user ? user?.email : ' '}
										InputProps={{
											readOnly: !toggle,
										}}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={6} lg={6}>


									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-readonly-label">Role</InputLabel>
										<Select
											labelId="demo-simple-select-readonly-label"
											id="demo-simple-select-readonly"
											value={role}
											label="Role"
											onChange={handleChange}
											inputProps={{ readOnly: !toggle }}
										>
											<MenuItem value={1}>Admin</MenuItem>
											<MenuItem value={2}>Learner</MenuItem>

										</Select>
									</FormControl>
								</Grid>

								{toggle && <><Grid item xs={12} sm={12} md={12} lg={12} >
									<Button
										fullWidth
										sx={{ backgroundColor: "blue !important", border: 'dashed' }}
										variant="contained"
										component="label"
									>
										<BackupIcon />
										Upload a File
										<input
											type="file"
											hidden
										/>
									</Button>
								</Grid>
									<Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'}>
										<Button variant="contained">Update</Button></Grid></>}
							</Grid>
						</CardContent>
					</Card>

				</Box>
			</Box>
			<Footer />
		</>

	);
}
