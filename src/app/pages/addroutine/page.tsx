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
    const uploadImage = async (image: File) => {
        const formData = new FormData();
        formData.append('myimage', image);

        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/imageupload/uploadimage', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Image has been uploaded successfully.', data);
            return data.imageUrl; // return the Cloudinary image URL so it can be used to set the routine image URLs
        } else {
            console.log('Error uploading the image.');
            return null;
        }

    }
    const saveRoutine = async () => {
        await checkAdminLogin();

        console.log(routine)

        if (routine.name == '' || routine.details == '' || routine.lengthMinutes == 0 || routine.exercises.length == 0 || routine.imageFile == null) {
            toast.error('Please fill all the routine fields', {
                position: 'top-center'
            })
            return;
        }

        // Use a copy of the state variable to avoid using setState to update the imageURL value, state updates are asynchronous
        // so imageURL will not be updated before the routine is saved in backend
        let updatedRoutine = { ...routine };

        if (routine.imageFile) {
            const imageURL = await uploadImage(routine.imageFile);
            if (imageURL) {
                updatedRoutine.imageURL = imageURL;
            }
        }

        for (let i = 0; i < routine.exercises.length; i++) {
            let tempImg = routine.exercises[i].imageFile;
            if (tempImg) {
                let imageURL = await uploadImage(tempImg);
                updatedRoutine.exercises[i].imageURL = imageURL;
            }
        }
        
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/workoutroutines/routines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRoutine),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Routine saved successfully', data);
            toast.success('Routine saved successfully', {
                position: 'top-center'
            });
        } else {
            console.error('Error saving routine', response.statusText);
            toast.error('Error saving routine', {
                position: 'top-center'
            });
        }
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