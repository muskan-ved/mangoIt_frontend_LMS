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
import { userProfileValidations } from '@/validation_schema/profileValidation';
import { ToastContainer } from 'react-toastify';

// Types Import
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
import 'react-toastify/dist/ReactToastify.css';

// API services
import { HandleProfile } from '@/services/user';
import { HandleUpdateProfile } from '@/services/user';


export default function Profile() {
	const {
		register, handleSubmit, reset, setValue, getValues,
		formState: { errors },
	} = useForm<userType | any>({ resolver: yupResolver(userProfileValidations) });

	const [userUpdated, setUpdateData] = useState<userType | any>({
		first_name: '',
		last_name: '',
		email: '',
		profile_pic: '',
		role_id: 0,
	})
	// console.log(userUpdated,"userUpdated")
	const [isLoading, setLoading] = useState(false)
	const [toggle, setToggle] = useState<boolean>(false);




	const onSubmit = async (event: any) => {
		const getuserValue = getValues()
		// console.log(event)
		//  console.log(getuserValue.id)

		await HandleUpdateProfile(getuserValue).then((res) => {
			console.log(res)
			setTimeout(() => {
				getProfileData(res.data.id)
				setToggle(!toggle)
			}, 3000)
		}).catch((err) => {
			console.log(err)
		})

	}

	function ErrorShowing(errorMessage: any) {
		return (<Typography variant="body2" color={'error'} gutterBottom>{errorMessage} </Typography>);
	}

	const getProfileData = (userId: any) => {
		setLoading(true)
		HandleProfile(userId)
			.then((user) => {
				const fields = ['id', 'first_name', 'last_name', 'email', 'role_id', 'profile_pic'];
				fields.forEach(field => setValue(field, user.data[field]));
				setUpdateData({
					first_name: user.data.first_name,
					last_name: user.data.last_name,
					email: user.data.email,
					profile_pic: user.data.profile_pic,
					role_id: user.data.role_id,
				})
				setLoading(false)
			})
	}
	useEffect(() => {
		let localData: any;
		if (typeof window !== "undefined") {
			localData = window.localStorage.getItem('userData')
		}
		if (localData) {
			const userId = JSON.parse(localData)
			getProfileData(userId?.id)
		}

	}, [])

	if (isLoading) return <SpinnerProgress />
	if (!userUpdated) return <p>No profile data</p>

	const handleEdit = async () => {
		setToggle(!toggle)
	}
	const handleChange = (e: any) => {
		const data = e.target.name
		if (e.target.name !== "profile_pic") {
			setUpdateData({ ...userUpdated, [data]: e.target.value })
		} else if (e.target.name === "profile_pic") {
			setUpdateData({ ...userUpdated, [data]: e.target.files[0] })
		}
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
												{userUpdated ? capitalizeFirstLetter(userUpdated?.first_name) : ''} {userUpdated?.last_name}
											</Typography>

											<Typography
												variant="subtitle2"
												sx={{ color: "#7C7C7C" }}>
												{userUpdated?.email}
											</Typography>

											<Typography
												variant="subtitle2"
												sx={{ color: "#7C7C7C" }}>
												{userUpdated?.role_id === 2 ? "Learner" : "Admin"}
											</Typography>

											<IconButton onClick={handleEdit}>
												<EditIcon>
												</EditIcon>
											</IconButton>

										</Box>
									</Box>
								</Grid>
							</Grid>

							<Box
								component="form"
								method='POST'
								noValidate
								autoComplete="off"
								onSubmit={handleSubmit(onSubmit)}
								onReset={reset}>
								<Grid container spacing={3} sx={{ maxWidth: '50%', width: ' 100%', float: 'right', marginRight: '100px', marginBottom: '150px' }}>
									<Grid item xs={12} sm={12} md={6} lg={6}>

										<TextField
											label="First Name"
											{...register("first_name")}
											defaultValue={userUpdated?.first_name}

											InputProps={{
												readOnly: !toggle,
											}}
										/>
										{errors && errors.first_name ? ErrorShowing(errors?.first_name?.message) : ''}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<TextField
											label="Last Name"
											{...register("last_name")}
											defaultValue={capitalizeFirstLetter(userUpdated?.last_name)}
											InputProps={{
												readOnly: !toggle
											}}
										/>
										{errors && errors.last_name ? ErrorShowing(errors?.last_name?.message) : ''}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<TextField
											label="Email"
											{...register("email")}
											defaultValue={userUpdated?.email}
											InputProps={{
												readOnly: !toggle,
											}}
										/>
										{errors && errors.email ? ErrorShowing(errors?.email?.message) : ''}
									</Grid>

									<Grid item xs={12} sm={12} md={6} lg={6}>
										<FormControl fullWidth>
											<InputLabel>Role</InputLabel>
											<Select
												label="Role"
												{...register("role_id")}
												defaultValue={userUpdated.role_id}
												inputProps={{ readOnly: !toggle }}
											>
												<MenuItem value={1}>Admin</MenuItem>
												<MenuItem value={2}>Learner</MenuItem>
											</Select>
										</FormControl>
									</Grid>

									{toggle && <><Grid item xs={12} sm={12} md={12} lg={12} >
									{/* <Typography> Pick Your Photo </Typography> */}
										<InputLabel											
											sx={{ border: '1.5px dashed grey',textAlign:'center'}}															
										>
										
											<BackupIcon  sx={{color:'grey !important',width:'100%' }}/>
										
											<Typography> Upload a File </Typography> 
											<input
												type="file"
												{...register("profile_pic")}
												onChange={handleChange}
												hidden
											/>
										</InputLabel>
									</Grid>
										<Grid item xs={12} sm={12} md={12} lg={12} textAlign={'right'}>
											<Button
												type="submit"
												fullWidth
												size="large"
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
											>
												Update Profile
											</Button>
											</Grid></>}
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
