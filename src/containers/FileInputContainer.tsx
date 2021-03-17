import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { FileInput } from "../components/FileInput";
import { updateDataStore } from "../redux/actionCreators/dataActions";

const connector = connect(null, { updateDataStore });

export type IFileInputContainer = ConnectedProps<typeof connector>;

export const FileInputContainer = connector(FileInput);
