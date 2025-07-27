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
//   const { data: session, status } = useSession();
//   const router = useRouter();
//     console.log({status})
//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login"); // tự động chuyển hướng nếu chưa đăng nhập
//     }
//   }, [status, router]);

//   if (status === "loading") {
//     return <p>Đang kiểm tra đăng nhập...</p>;
//   }

    return (
        <main>
            <Timeline versions={versions} />
        </main>
    );
}
