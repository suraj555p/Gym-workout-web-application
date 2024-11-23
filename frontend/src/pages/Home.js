import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext.js";
import {useAuthContext} from '../hooks/useAuthContext.js'

// components
import WorkoutDetails from '../components/WorkoutDetails.js';
import WorkoutForm from "../components/WorkoutForm.js";

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext();
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts',{
                headers: {
                    'Authorization':`Bearer ${user.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json });
            }
        };

        if(user){
            fetchWorkouts();
        }

    }, [dispatch, user]); // Added dispatch as a dependency

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    );
}

export default Home;
