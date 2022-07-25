import {
	Box,
	Button,
	Modal,
	ModalContent,
	ModalOverlay,
	useDisclosure,
	useToast,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	FormControl,
	Input,
	FormErrorMessage,
	useColorModeValue,
	Textarea,
	FormLabel,
	Switch,
	ModalFooter,
	Stack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axiosInstance from "../../services/axios";

export const TodoAddUpdateModal = ({
	editable = false,
	defaultValues = {},
	onSuccess = () => {},
	...rest
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const toast = useToast();
	const { todoId } = useParams();
	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: { ...defaultValues },
	});

	const onSubmit = async (values) => {
		try {
			if (editable) {
				await axiosInstance.put(`/todo/${todoId}`, values);
			} else {
				await axiosInstance.post("/todo/", values);
			}
			toast({
				title: editable ? "Successfully updated" : "Successfully created",
				status: "success",
				isClosable: true,
				duration: 2000,
			});
			onSuccess();
			onClose();
		} catch (error) {
			console.error(error);
			toast({
				title: editable ? "Error when updated" : "Error when created",
				status: "error",
				isClosable: true,
				duration: 2000,
			});
		}
	};

	return (
		<Box {...rest}>
			<Button w='100%' colorScheme='blue' onClick={onOpen}>
				{editable ? "UPDATE TODO!" : "ADD TODO!"}
			</Button>
			<Modal
				closeOnOverlayClick={false}
				size='xl'
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<ModalOverlay />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalContent>
						<ModalHeader>{editable ? "Update Todo!" : "Add Todo!"}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl isInvalid={errors.title}>
								<Input
									placeholder='Todo Title'
									background={useColorModeValue("gray.300", "gray.600")}
									type='text'
									variant='filled'
									size='lg'
									mt={6}
									{...register("title", {
										required: "Title is required",
										minLength: {
											value: 1,
											message: "Title must be at least 1 characters",
										},
										maxLength: {
											value: 55,
											message: "Title must be at most 55 characters",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.title && errors.title.message}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.description}>
								<Textarea
									rows={5}
									placeholder='Todo Description'
									background={useColorModeValue("gray.300", "gray.600")}
									type='text'
									variant='filled'
									size='lg'
									mt={6}
									{...register("description", {
										maxLength: {
											value: 1024,
											message: "Description must be at most 1024 characters",
										},
									})}
								/>
								<FormErrorMessage>
									{errors.description && errors.description.message}
								</FormErrorMessage>
							</FormControl>
							<Controller
								control={control}
								name='status'
								render={({ field }) => (
									<FormControl mt={6} display='flex' alignItems='center'>
										<FormLabel htmlFor='is-done'>Status</FormLabel>
										<Switch
											onChange={(e) => field.onChange(e.target.checked)}
											isChecked={field.value}
											id='is-done'
											size='lg'
											name='status'
											isDisabled={false}
											colorScheme='blue'
											variant='ghost'
										/>
									</FormControl>
								)}
							/>
						</ModalBody>
						<ModalFooter>
							<Stack width='100%' spacing={3}>
								<Button
									colorScheme='blue'
									type='submit'
									isLoading={isSubmitting}
									loadingText={editable ? "Updating" : "Creating"}
								>
									{editable ? "Update" : "Add Todo!"}
								</Button>
								<Button onClick={onClose} disabled={isSubmitting}>
									Close
								</Button>
							</Stack>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</Box>
	);
};
