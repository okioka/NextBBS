CREATE TABLE BBS.posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR(20) NOT NULL,
    comment VARCHAR(255) NOT NULL,
    post_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    /* delete_flg 0:デフォルト値 1:削除 */
    delete_flg VARCHAR(1) NOT NULL
);
