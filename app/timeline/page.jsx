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
    }
  ];

  return (
    <main>
      <h1>📌 Timeline</h1>
      <Timeline versions={versions} />
    </main>
  );
}
