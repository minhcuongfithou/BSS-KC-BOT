import connectDB from '@/utils/mongodb';
import Action from '@/models/Action';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    const id = (await params).id;
    try {
        const action = await Action.findById(id);
        if (!action) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json(action, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();

    const { id } = params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    // }

    try {
        const data = await req.json();

        // OPTIONAL: Validate
        // if (!data.name || !data.type) {
        //   return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        // }

        // const updatedAction = await Action.findByIdAndUpdate(id, data, {
        //     new: true,
        //     runValidators: true,
        // });
        // switch(name) {
        //     case 'custom-display-some-country': {
        //         data.
        //     }
        // }
        const updatedAction = await Action.findOneAndUpdate(
            { name: id },
            { data },
            {
                new: true,
                runValidators: true,
            }
        );

        // console.log({ updatedAction })

        if (!updatedAction) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }

        return NextResponse.json(updatedAction);
    } catch (error) {
        console.error('PUT /api/... error:', error);
        return NextResponse.json(
            { message: 'Error while updating', error: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(req, { params }) {
    await connectDB();
    const id = (await params).id;
    try {
        const deleted = await Action.findByIdAndDelete(id);
        if (!deleted) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Deleted successfully', id });
    } catch (error) {
        return NextResponse.json({ message: 'Error while deleting', error }, { status: 500 });
    }
}
