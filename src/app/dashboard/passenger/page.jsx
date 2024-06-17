export default function PassengerPage() {
    return (
        <div className="container flex flex-col gap-12 sm:flex-row">
            <aside className="max-w-[400px] pr-5">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Publish your Ride
                        </CardTitle>
                    </CardHeader>
                    <form className="space-y-8">
                        <div className="flex items-center space-x-2 ">
                            <Navigation />
                            <Input placeholder='Pick up Location' />
                        </div>
                        <div className="flex items-center space-x-2 mx-auto">
                            <MapPin />
                            <Input placeholder='Drop Off Location' />

                        </div>
                        <Button type="submit" size="sm" className="w-full">
                            Search
                        </Button>
                    </form>
                </Card>
            </aside>
            <main className='w-full'>
                <h1>Google Map</h1>
            </main>
        </div>
    )
}
