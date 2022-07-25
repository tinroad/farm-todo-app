import { useEffect, useRef, useState } from "react";
import { Box, Center, Container, Spinner } from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import { TodoCard } from "./TodoCard";
import { TodoAddUpdateModal } from "./TodoAddUpdateModal";

export const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);
	const isMounted = useRef(false);

	const fetchTodo = async () => {
		setLoading(true);
		axiosInstance
			.get("/todo/")
			.then((res) => {
				setTodos(res.data);
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		if (isMounted.current) return;
		fetchTodo();
		isMounted.current = true;
	}, []);
	return (
		<Container mt={9}>
			<TodoAddUpdateModal onSuccess={fetchTodo} my={3} />
			{loading ? (
				<Center mt={6}>
					<Spinner
						thickness='4px'
						speed='0.6s'
						emptyColor='blue.200'
						color='blue.500'
						size='xl'
					/>
				</Center>
			) : (
				<Box mt={6}>
					{todos?.map((todo) => (
						<TodoCard todo={todo} key={todo.todo_id} />
					))}
				</Box>
			)}
		</Container>
	);
};
