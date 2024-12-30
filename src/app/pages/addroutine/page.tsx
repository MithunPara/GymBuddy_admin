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

    const addExerciseToRoutine = () => {}
    const deleteExerciseFromRoutine = () => {}
    const checkAdminLogin = () => {}
    const uploadImage = () => {}
    const saveRoutine = () => {}

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

        

    </div>
  )
}

export default page