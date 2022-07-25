import {
	Flex,
	useColorModeValue,
	Heading,
	FormControl,
	Input,
	FormErrorMessage,
	Button,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axios";
import ThemeToggler from "../Theme/ThemeToggler";

export const Register = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();
	const navigate = useNavigate();
	const toast = useToast();

	const onSubmit = async (values) => {
		try {
			await axiosInstance.post("/users/user", values);
			toast({
				title: "Account created successfully",
				status: "success",
				isClosable: true,
				duration: 2000,
			});
			navigate("/login", { replace: true });
		} catch (error) {
			toast({
				title: `${error.response.data.details}`,
				status: "error",
				isClosable: true,
				duration: 3000,
			});
		}
	};

	return (
		<Flex height='100vh' align='center' justifyContent='center'>
			<Flex
				direction='column'
				alignItems='center'
				background={useColorModeValue("gray.100", "gray.700")}
				p={12}
				rounded={6}
			>
				<Heading mb={6}>Register</Heading>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={errors.email}>
						<Input
							placeholder='Email'
							background={useColorModeValue("gray.300", "gray.600")}
							type='email'
							size='lg'
							mt={6}
							{...register("email", {
								required: "Email is required",
							})}
						/>
						<FormErrorMessage>
							{errors.email && errors.email.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.username}>
						<Input
							placeholder='Username'
							background={useColorModeValue("gray.300", "gray.600")}
							type='text'
							variant='filled'
							size='lg'
							mt={6}
							{...register("username", {
								required: "Username is required",
								minLength: {
									value: 5,
									message: "Username must be at least 5 characters",
								},
								maxLength: {
									value: 24,
									message: "Username must be at most 24 characters",
								},
							})}
						/>
						<FormErrorMessage>
							{errors.username && errors.username.message}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={errors.password}>
						<Input
							placeholder='Password'
							background={useColorModeValue("gray.300", "gray.600")}
							type='password'
							size='lg'
							mt={6}
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
								maxLength: {
									value: 24,
									message: "Password must be at most 24 characters",
								},
							})}
						/>
						<FormErrorMessage>
							{errors.password && errors.password.message}
						</FormErrorMessage>
					</FormControl>
					<Button
						isLoading={isSubmitting}
						loadingText='Logging in...'
						width='100%'
						colorScheme='green'
						variant='outline'
						mt={6}
						mb={6}
						type='submit'
					>
						Register
					</Button>
				</form>
				<ThemeToggler showLabel={true} />
				<Button
					onClick={() => navigate("/Login", { replace: true })}
					width='100%'
					colorScheme='red'
					variant='outline'
					mt={6}
				>
					Login
				</Button>
			</Flex>
		</Flex>
	);
};
