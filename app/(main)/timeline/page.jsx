import Timeline from '@/app/components/Timeline';

export default function TimelinePage() {
    const versions = [
        {
            version: '1.0.0',
            date: '23/06/2025',
            updates: [
                'Project Initialization',
                'Feature Solution Archiving',
                'Feature Autocomplete'
            ]
        },
        {
            version: '1.1.0',
            date: '13/07/2025',
            updates: [
                'Deprecate Mattermost',
                'Web UI',
            ]
        },
        {
            version: '1.2.0',
            date: '26/07/2025',
            updates: [
                'Login with Google',
            ]
        }
    ];

    return (
        <main>
            <Timeline versions={versions} />
        </main>
    );
}
