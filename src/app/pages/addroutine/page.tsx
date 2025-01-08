"use client"
import React, { useState } from 'react'
import './addroutine.css'
import { toast } from 'react-toastify'

interface Routine {
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

const page = () => {
    const [routine, setRoutine] = useState<Routine>({
        name: '',
        details: '',
        lengthMinutes: 0,
        exercises: [],
        imageURL: '',
        imageFile: null
    });

    const [exercise, setExercise] = useState<Exercise>({
        name: '',
        details: '',
        sets: 0,
        reps: 0,
        imageURL: '',
        imageFile: null
    });

    const handleRoutineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoutine({
            ...routine,
            [e.target.name]: e.target.value
        })
    }

    const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExercise({
            ...exercise,
            [e.target.name]: e.target.value
        })
    }

    const addExerciseToRoutine = () => {
        console.log(exercise)

        if (exercise.name == '' || exercise.details == '' || exercise.sets == 0 || exercise.reps == 0 || exercise.imageFile == null) {
            toast.error('Please fill all exercise fields', {
                position: 'top-center'
            });
            return;
        }

        // Add exercise to the workout
        setRoutine({
            ...routine,
            exercises: [...routine.exercises, exercise]
        })
        // Clear the exercise state variable to add new exercises
        // setExercise({
        //     name: '',
        //     details: '',
        //     sets: 0,
        //     reps: 0,
        //     imageURL: '',
        //     imageFile: null
        // })
    }
    const deleteExerciseFromRoutine = (index: number) => {
        setRoutine({
            ...routine,
            exercises: routine.exercises.filter((exercise, indexVal) => indexVal !== index)
        })
    }
    const checkAdminLogin = () => {}
    const uploadImage = () => {}
    const saveRoutine = () => {
        console.log(routine)
    }

  return (
    <div className='input-form'>
        <h1 className='title'>Add Routine</h1>

        <input 
            type='text' 
            placeholder='Routine Name' 
            name='name' // Adding this name field to the input element will allow handleRoutineChange function to access the event target name and update the name attribute within the routine state variable
            value={routine.name} 
            onChange={handleRoutineChange} 
        />

        <textarea 
            placeholder='Routine Details'
            value={routine.details}
            onChange={(e) => {
                setRoutine({
                    ...routine,
                    details: e.target.value
                })
            }}
            rows={5}
            cols={50}
        />

        <input 
            type='number'
            placeholder='Routine Duration'
            name='lengthMinutes'
            value={routine.lengthMinutes}
            onChange={handleRoutineChange}
        />

        <input 
            type='file'
            placeholder='Routine Image'
            onChange={(e) => {
                setRoutine({
                    ...routine,
                    imageFile: e.target.files![0]
                })
            }}    
        />

        <div>
            <h2 className='title'>Add an Exercise</h2>

            <input 
                type='text' 
                placeholder='Exercise Name' 
                name='name' 
                value={exercise.name}
                onChange={handleExerciseChange} 
            />

            <textarea 
                placeholder='Exercise Details'
                value={exercise.details}
                onChange={(e) => {
                    setExercise({
                        ...exercise,
                        details: e.target.value
                    })
                }}
                rows={5}
                cols={50}
            />

            <span>Sets</span>
            <input 
                type='number'
                placeholder='Number of sets'
                name='sets'
                value={exercise.sets}
                onChange={handleExerciseChange}
            />

            <span>Reps</span>
            <input 
                type='number'
                placeholder='Number of reps'
                name='reps'
                value={exercise.reps}
                onChange={handleExerciseChange}
            />

            <input 
                type='file'
                placeholder='Exercise Image'
                onChange={(e) => {
                    setExercise({
                        ...exercise,
                        imageFile: e.target.files![0]
                    })
                }}    
            />
            <button onClick={(e) => {
                addExerciseToRoutine(e)
            }}>Add Exercise</button>
        </div>

        <div className='list-exercises'>
            <h1 className='title'>Exercises</h1>
            {
                routine.exercises.map((exercise, index) => (
                    <div className='exercise' key={index}>
                        <h2>{exercise.name}</h2>
                        <p>{exercise.details}</p>
                        <span>{exercise.sets}</span>
                        <span>{exercise.reps}</span>

                        <img src={
                            exercise.imageFile ? 
                            URL.createObjectURL(exercise.imageFile) :
                            exercise.imageURL 
                        } alt='Exercise Image' />

                        <button onClick={() => deleteExerciseFromRoutine(index)}>Delete Exercise</button>
                    </div>
                ))
            }
        </div>

        <button onClick={(e) => {
            saveRoutine(e)
        }}>Save Routine</button>
    </div>
  )
}

export default page