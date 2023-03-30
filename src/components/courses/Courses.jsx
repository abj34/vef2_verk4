import { useEffect, useState } from 'react';
import { generateApiUrl } from '../../utils/generateApiUrl';

export function Courses({ title, slug, text }) {
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('empty');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await fetchCourses();
          }
          fetchData();
    }, []);

    async function fetchCourses() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`/departments/${slug}/courses`));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setCourses(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }


    return (
        <section>
            <h2>{title}</h2>
            {state === 'empty' && (<p>Engir áfangar</p>)}
            {state === 'error' && (<p>Villa við að sækja áfanga</p>)}
            {state === 'loading' && (<p>Sæki áfanga...</p>)}
            <ul>
                {state === 'data' && courses.map((course, i) => {
                    return (
                        <li key={i}>{course.title}</li>
                    )
                })}
            </ul>
            <button onClick={fetchCourses}>Sækja áfanga</button>
        </section>
    )
}