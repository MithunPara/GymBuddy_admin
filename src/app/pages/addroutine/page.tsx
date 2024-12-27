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
    <div>

    </div>
  )
}

export default page