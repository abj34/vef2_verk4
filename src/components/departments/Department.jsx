import '../../App.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { generateApiUrl } from '../../utils/generateApiUrl';
import { CourseForm } from '../courses/Courses';

export function Department() {
    const { slug } = useParams();
    console.log(slug);
    // type State = 'empty' | 'data' | 'error' | 'loading'
    const [state, setState] = useState('loading');
    const [department, setDepartment] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await fetchDepartment();
          }
          fetchData();
    }, []);

    async function fetchDepartment() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}`));
            if(!response.ok) {
                throw new Error('Something went wrong');
            }
            const json = await response.json();
            setDepartment(json);
            setState('data');
        } catch(e) {
            setState('error');
            console.log(e);
        }
    }

    async function removeDepartment() {
        setState('loading');
        try {
            const response = await fetch(generateApiUrl(`departments/${slug}`), {
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
            <p>Villa að sækja deild</p>
        );
    }

    if (state === 'loading') {
        return (
            <p>Sæki deild</p>
        );
    }

    if (state === 'deleted') {
        return (
            <>
                <p>Deild fjarlægð</p>
                <Link to="/departments">Til baka að sjá deildir</Link>
            </>
        );
    }


    return (
        <section>
            <h2>{department.title}</h2>
            <p>{department.description}</p>

            <CourseForm />
            
            <Link to={`/departments/${department.slug}/courses`}>Sjá alla áfanga á braut</Link>

            <button onClick={removeDepartment}>Fjarlægja deild</button>
        </section>
    )
}