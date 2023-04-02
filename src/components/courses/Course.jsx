import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../../App.css';
import { generateApiUrl } from '../../utils/generateApiUrl';

export function Course() {
    const { slug, courseId } = useParams();
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('loading');
    const [course, setCourse] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await fetchCourse();
          }
          fetchData();
    }, []);

    async function fetchCourse() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}/courses/${courseId}`));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setCourse(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }

    async function removeCourse() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}/courses/${courseId}`), {
                method: 'DELETE'
            });
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            setState('deleted');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }

    if (state === 'error') {
        return (
            <p>Villa að sækja áfanga</p>
        );
    }

    if (state === 'loading') {
        return (
            <p>Sæki áfanga</p>
        );
    }

    if (state === 'deleted') {
        return (
            <>
                <p>Áfangi fjarlægður</p>
                <Link to={`/departments/${slug}/courses`}>Til baka að sjá áfanga deildar</Link>
            </>
        );
    }


    return (
        <section>
            <h2>{course.title}</h2>
            <ul>
            <li>{course.courseId}</li>
            <li>{course.units}</li>
            <li>{course.semester}</li>
            <li>{course.level}</li>
            <li>{course.url}</li>
            </ul>
            

            <Link to={`/departments/${slug}/courses/`}>Aftur til baka</Link>

            <button onClick={removeCourse} className="remove-button">Fjarlægja deild</button>
        </section>
    )
}