import connectDB from '@/utils/mongodb';
import Action from '@/models/Action';
import { NextResponse } from 'next/server';
import Handle from '@/models/Handle';
import mongoose from 'mongoose';
import vahuService from '@/services/vahuService';

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
                const result = await vahuService.saveContent(data.author, data.domain, "add", titleAction, [`${data.listCountrySelected.map(code => `"${code}"`).join(',')}`]);
                return NextResponse.json(updatedAction);
            }
            case 'custom-confirm-password': {
                data.name = titleAction;
                const updatedAction = await Handle.findOneAndUpdate(
                    { actionId: new mongoose.Types.ObjectId('6860d5da755cfef4b9d6ce49'), domain: data.domain },
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
                const dataLanguage = {
                    GB: {
                        labelPass: 'Confirm Password',
                        emptyPass: 'Please confirm your password',
                        incorrectPass: 'Passwords do not match'
                    },
                    DE: {
                        labelPass: 'Passwort bestätigen',
                        emptyPass: 'Bitte bestätigen Sie Ihr Passwort',
                        incorrectPass: 'Passwörter stimmen nicht überein'
                    },
                    IT: {
                        labelPass: 'Conferma password',
                        emptyPass: 'Per favore conferma la tua password',
                        incorrectPass: 'Le password non corrispondono'
                    }
                }
                const result = await vahuService.saveContent(data.author, data.domain, "add", titleAction, [dataLanguage[data.language], data.page]);
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
