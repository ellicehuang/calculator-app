//
//  ContentView.swift
//  calculator
//
//  Created by Ellice Huang on 12/4/24.
//

import SwiftUI

struct ContentView: View {
    @Binding var document: calculatorDocument

    var body: some View {
        TextEditor(text: $document.text)
    }
}

#Preview {
    ContentView(document: .constant(calculatorDocument()))
}
