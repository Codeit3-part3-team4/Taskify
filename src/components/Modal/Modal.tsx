'use client';
import React from 'react';

export default function Modal() {
  return (
    <div>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_3').showModal()}
      >
        모달
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
}
