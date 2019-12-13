import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {data, CommentBox, CommentForm} from './App';
import * as serviceWorker from './serviceWorker';

// コメント
// データ無しの場合は表示しない
if (data.length >= 1) {
    ReactDOM.render(
    <CommentBox data={data} />,
    document.getElementById('content')
    );
}
// 投稿フォーム
ReactDOM.render(
    <CommentForm />,
    document.getElementById('form')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
