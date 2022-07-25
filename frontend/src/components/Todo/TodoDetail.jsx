import {
	Button,
	Center,
	Container,
	Spinner,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";
import { TodoAddUpdateModal } from "./TodoAddUpdateModal";

export const TodoDetail = () => {
	const [todo, setTodo] = useState({});
	const [loading, setLoading] = useState(true);
	const isMounted = useRef(false);
	const navigate = useNavigate();
	const toast = useToast();
	const { todoId } = useParams();
	const background = useColorModeValue("gray.300", "gray.600");

	useEffect(() => {
		if (isMounted.current) return;
		fetchTodo();
		isMounted.current = true;
	}, [todoId]);

	const deleteTodo = () => {
		setLoading(true);
		axiosInstance
			.delete(`/todo/${todoId}`)
			.then((res) => {
				navigate("/", { replace: true });
				toast({
					title: "Successfully deleted",
					status: "success",
					isClosable: true,
					duration: 2000,
				});
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const fetchTodo = async () => {
		setLoading(true);
		axiosInstance
			.get(`/todo/${todoId}`)
			.then((res) => {
				setTodo(res.data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	if (loading) {
		return (
			<Container mt={6}>
				<Center>
					<Spinner
						thickness='4px'
						speed='0.6s'
						emptyColor='blue.200'
						color='blue.500'
						size='xl'
					/>
				</Center>
			</Container>
		);
	} else {
		return (
			<>
				<Container mt={6}>
					<Button
						colorScheme='gray'
						onClick={() => navigate("/", { replace: true })}
					>
						Back
					</Button>
				</Container>
				<Container
					bg={background}
					minHeight='7rem'
					my={3}
					p={3}
					rounded='lg'
					alignItems='center'
					justifyContent='space-between'
				>
					<Text fontSize={22}>{todo.title}</Text>
					<Text bg='gray.500' mt={2} p={2} rounded='lg' minHeight='2.5rem'>
						{todo.description}
					</Text>
					<TodoAddUpdateModal
						my={3}
						editable={true}
						defaultValues={{
							title: todo.title,
							description: todo.description,
							status: todo.status,
						}}
						onSuccess={fetchTodo}
					/>
					<Button
						w='100%'
						isLoading={loading}
						colorScheme='red'
						onClick={deleteTodo}
					>
						Delete
					</Button>
				</Container>
			</>
		);
	}
};
