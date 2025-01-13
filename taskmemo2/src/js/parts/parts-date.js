    /**
     * Typeを設定する
     * @param {string} type タイプ
     * @return {void}
     */
    set type(type) {
      this.shadowRoot.getElementById("due-date").type = type;
    }

    /**
     * due-date入力フィールドの値を当日日付に更新する
     */
    setToday() {
      // due-date入力要素を取得
      const dateInput = this.shadowRoot.getElementById("due-date");

      // 入力要素のタイプがdateの場合を確認
      if (dateInput.type === "date") {
        // date入力タイプの値を設定
        dateInput.value = Utils.formatDate(new Date(), "{yyyy}-{MM}-{dd}");
      } else {
        // datetime-local入力タイプの値を設定
        dateInput.value = Utils.formatDate(
          new Date(),
          "{yyyy}-{MM}-{dd}T{HH}:{mm}"
        );
      }
    }