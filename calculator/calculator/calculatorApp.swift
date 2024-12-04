//
//  calculatorApp.swift
//  calculator
//
//  Created by Ellice Huang on 12/4/24.
//

import SwiftUI

@main
struct calculatorApp: App {
    var body: some Scene {
        DocumentGroup(newDocument: calculatorDocument()) { file in
            ContentView(document: file.$document)
        }
    }
}
