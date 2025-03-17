"use client"
import React, { useState, useEffect } from 'react'
import './deleteroutine.css'
import { toast } from 'react-toastify'

interface Routine {
    _id: string
    name: string,
    details: string,
    lengthMinutes: number,
    exercises: Exercise[],
    imageURL: string,
    imageFile: File | null
}

interface Exercise {
    name: string,
    details: string,
    sets: number,
    reps: number,
    imageURL: string,
    imageFile: File | null
}

const DeleteRoutine = () => {
    const [routines, setRoutines] = useState<Routine[] | null>(null);

    const checkAdminLogin = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/checklogin', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {    
            if (data.ok) {
                console.log('Admin is authenticated');
            } 
            else {
                console.log('Admin is not authenticated');
                window.location.href = '/adminauth/login';
            }
          }).catch(err => console.log(err));
    }

    const getRoutines = async () => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutroutines/getroutines', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                setRoutines(data.data);
            } else {
                setRoutines([])
            }
        })
        .catch(err => {
            console.log(err);
            setRoutines([]);
        })
    }

    const deleteRoutine = async (index: number) => {
        await checkAdminLogin();

        const routineId = routines ? routines[index]._id: null;

        if (routineId) {
            fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutroutines/workouts/' + routineId, {
                method: 'DELETE',
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    console.log('Routine deleted successfully', data);
                    toast.success('Routine deleted successfully', {
                        position: 'top-center'
                    });
                    const updatedRoutines = routines ? routines?.filter((_, i) => i !== index) : null;
                    setRoutines(updatedRoutines);
                } else {
                    console.log('Error deleting routine', data.message);
                    toast.error('Error deleting routine', {
                        position: 'top-center'
                    });
                }
            })
            .catch(err => {
                console.log(err);
                toast.error('Error deleting routine', {
                    position: 'top-center'
                });
            })
        }

    }

    useEffect(() => {
        getRoutines()
    }, [])

  return (
    <div className='list-routines'>
        <h1 className='title'>Delete a Routine</h1>
        {
            routines && routines.map((routine: Routine, index: number) => (
                <div className='routine' key={index}>
                    <h2>{routine.name}</h2>
                    <p>{routine.details}</p>
                    <div className='routine-exercises'>
                        {
                            routine.exercises.map((exercise: Exercise, exerciseIndex: number) => (
                                <div className='routine-exercise' key={exerciseIndex}>
                                    <span>{exercise.name}</span>
                                    <span>{exercise.sets} Sets x {exercise.reps} reps</span>
                                </div>
                            ))
                        }
                    </div>

                    <img src={
                            routine.imageFile ? 
                            URL.createObjectURL(routine.imageFile) :
                            routine.imageURL 
                        } alt='Routine Image' />

                    <button onClick={() => deleteRoutine(index)}>Delete Routine</button>
                </div>
            ))
        }
    </div>
  )
}

export default DeleteRoutine