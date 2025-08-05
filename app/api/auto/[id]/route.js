import connectDB from '@/utils/mongodb';
import Action from '@/models/Action';
import Handle from '@/models/Handle';
import mongoose from 'mongoose';
import vahuService from '@/services/vahuService';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    await connectDB();
    // const { id } = (await params);
    // try {
    //     const action = await Action.findById(id);
    //     if (!action) {
    //         return NextResponse.json({ message: 'Action not found' }, { status: 404 });
    //     }
    //     return NextResponse.json(action, { status: 200 });
    // } catch (error) {
    //     return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    // }


    const id = (await params).id;
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');
    console.log({ id, domain })
    try {
        // 1. Tìm action theo name
        const action = await Action.findOne({ name: id }).lean();
        if (!action) return null;

        const actionId = action._id;

        // 2. Tìm handle theo actionId và domain
        const handle = await Handle.findOne({ actionId, domain }).lean();
        if (!handle) {
            return NextResponse.json({ message: 'Handle not found' }, { status: 404 });
        }
        return NextResponse.json(handle, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    await connectDB();
    const titleAction = (await params).id;
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
        switch (titleAction) {
            case 'custom-display-some-country': {
                data.params = [data.listCountrySelected.join(',')];
                // delete data.listCountrySelected;
                data.name = titleAction;
                console.log(data)
                const updatedAction = await Handle.findOneAndUpdate(
                    { actionId: new mongoose.Types.ObjectId('685fb7a6c4ff5c8d331323a5'), domain: data.domain },
                    { $set: { ...data } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                console.log({ updatedAction })

                if (!updatedAction) {
                    return NextResponse.json({ message: 'Action not found' }, { status: 404 });
                }

                // update trong vahu
                const result = await vahuService.checkAndSaveContent(data.author, data.domain, "add", titleAction, [`${data.listCountrySelected.map(code => `"${code}"`).join(',')}`]);
                return NextResponse.json(updatedAction);
            }
            case 'custom-confirm-password': {
                // data.name = titleAction;
                data.params = `${data.translate}|${data.page}`;
                delete data.page;
                delete data.translate;
                console.log(data)
                const updatedAction = await Handle.findOneAndUpdate(
                    { actionId: new mongoose.Types.ObjectId('6860d5da755cfef4b9d6ce49'), domain: data.domain },
                    { $set: { ...data } },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                // console.log({ updatedAction })
                if (!updatedAction) {
                    return NextResponse.json({ message: 'Action not found' }, { status: 404 });
                }
                const params = JSON.stringify({
                    language: data.language,
                    page: data.page
                })

                const result = await vahuService.checkAndSaveContent(data.author, data.domain, "add", titleAction, params);
                return NextResponse.json(updatedAction);
            }
        }
        console.log(data)

    } catch (error) {
        console.error('PUT /api/auto/[id]:', error);
        return NextResponse.json(
            { message: 'Error while updating', error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    await connectDB();
    const id = (await params).id;
    const deletedAt = await req.json();
    try {
        const deleted = await Action.findByIdAndUpdate(id, { deletedAt: deletedAt });
        if (!deleted) {
            return NextResponse.json({ message: 'Action not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Deleted successfully', id });
    } catch (error) {
        return NextResponse.json({ message: 'Error while deleting', error }, { status: 500 });
    }
}
